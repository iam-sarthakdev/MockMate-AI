
import { getCurrentUser } from '@/src/models/User'
import InterviewWrapperClient from '@/src/components/InterviewWrapperClient'


const page = async () => {

  const user = await getCurrentUser();
  console.log(user);
  if (!user) return null;

  return (
    <InterviewWrapperClient
      userName={user?.name}
      userId={user?._id.toString()}
    />
  )
}

export default page
