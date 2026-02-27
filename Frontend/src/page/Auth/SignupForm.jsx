import { Button } from '@/components/ui/button'
import { register } from "@/State/Auth/Action"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const form = useForm({
    resolver: "",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = (data) => {
    dispatch(register(data))
    console.log(data)
    navigate("/");
  }

  return (
    <div>

      <h1 className='text-xl font-bold text-center pb-3'>Create New Account</h1>
      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="border w-full border-gray-600 p-5" placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default SignupForm;