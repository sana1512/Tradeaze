import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

const ForgotPasswordForm = () => {

    const form = useForm({
        resolver: "",
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>

            <h1 className='text-xl font-bold text-center pb-3'>Forgot Password</h1>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-600 p-5" placeholder="Enter your email ..." {...field} />
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

export default ForgotPasswordForm;