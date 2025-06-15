
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sendEmail, EmailData } from '@/services/emailService';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const emailData: EmailData = {
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
      };
      await sendEmail(emailData);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });
    }
  };

  return <section id="contact" className="py-16 md:py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">Ready to work together? Let's discuss your project</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300 text-sm sm:text-base break-all">subhashguptha308@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-cyan-400" />
                  <span className="text-gray-300 text-sm sm:text-base">+91 7306677599</span>
                </div>
                <div className="flex items-start space-x-4">
                  <Building className="w-6 h-6 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-cyan-400 font-medium text-sm">Work Address</div>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Amrita Vishwa Vidyapeetham Amaravati Campus,<br />
                      Kuragallu Village, Mangalagiri (M),<br />
                      Guntur, Andhra Pradesh – 522503, India
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-cyan-400 font-medium text-sm">Home Address</div>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      V K Rayapuram, Samalkota(M),<br />
                      Kakinada, Andhra Pradesh - 533434, India
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Linkedin className="w-6 h-6 text-cyan-400" />
                  <a href="https://www.linkedin.com/in/subhash-guptha-b65086290" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="w-6 h-6 text-cyan-400" />
                  <a href="https://github.com/SubhashGuptha30" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Card className="bg-slate-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} disabled={isSubmitting} className="border-gray-600 text-white placeholder-gray-400 bg-gray-800" />
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
                          <Input type="email" placeholder="Your Email" {...field} disabled={isSubmitting} className="border-gray-600 text-white placeholder-gray-400 bg-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Subject" {...field} disabled={isSubmitting} className="border-gray-600 text-white placeholder-gray-400 bg-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Tell me about your project..." rows={5} {...field} disabled={isSubmitting} className="border-gray-600 text-white placeholder-gray-400 resize-none bg-gray-800" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {isSubmitting ? <>Sending...</> : <>Send Message <ArrowRight className="ml-2 w-4 h-4" /></>}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;
