import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'
const LoadingForm = () => {
  return (
    <Box className='max-w-xl space-y-2 flex flex-col'>
      <Skeleton height='2rem'/>
      <Skeleton height='23rem'/>
      <Skeleton className='mt-7' width='9rem' height='2rem'/>
    </Box>
  )
}

export default LoadingForm