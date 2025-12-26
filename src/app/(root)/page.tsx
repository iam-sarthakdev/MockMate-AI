import { Button } from '@/src/components/ui/button'
import { HeroBackground } from '@/src/components/ui/HeroBackground'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentUser } from '@/src/models/User'
import { getInterviewByUserId, getLatestInterviews } from '@/src/lib/action'
import { getFeedbackByInterviewId } from '@/src/lib/action'
import DashboardClient from '@/src/components/DashboardClient'
import { redirect } from 'next/navigation'

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  const userInterviews = await getInterviewByUserId(user?._id.toString());
  const latestInterviews = await getLatestInterviews({ userId: user?._id.toString() });

  if (!userInterviews || !latestInterviews) return null;

  // Fetch feedback for all interviews upfront to avoid client-side fetching
  const interviewsWithFeedback = await Promise.all(
    userInterviews.map(async (interview: any) => {
      const feedback = await getFeedbackByInterviewId({
        interviewId: interview._id.toString(),
        userId: user._id.toString()
      });
      return {
        ...interview,
        feedback: feedback || null
      };
    })
  );

  // Serialize MongoDB objects to plain JavaScript objects
  const serializedUser = JSON.parse(JSON.stringify(user));
  const serializedInterviews = JSON.parse(JSON.stringify(interviewsWithFeedback));
  const serializedLatest = JSON.parse(JSON.stringify(latestInterviews));

  return (
    <DashboardClient
      user={serializedUser}
      userInterviews={serializedInterviews}
      latestInterviews={serializedLatest}
    />
  )
}
