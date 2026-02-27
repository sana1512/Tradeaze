import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { login } from '@/State/Auth/Action';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (data) => {
    dispatch(login({ data, navigate }))
    console.log(data)
  }

  return (
    <div>

      <h1 className='text-xl font-bold text-center pb-3'>Login</h1>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="border w-full border-gray-600 p-5" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="border w-full border-gray-600 p-5" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-black bg-white">
            Submit
          </Button>

        </form>
      </Form>

    </div>
  )
}

export default SigninForm;