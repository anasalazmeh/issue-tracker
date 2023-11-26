import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'
const LoadingForm = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton/>
      <Skeleton height='20rem'/>
      <Skeleton className='mt-7' width='8rem' height='2rem'/>
    </Box>
  )
}

export default LoadingForm