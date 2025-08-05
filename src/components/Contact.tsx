import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Building,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { sendEmail, EmailData } from "@/services/emailService";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

const ContactInfoCard = ({
  icon: Icon,
  title,
  content,
  href,
}: {
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
  href?: string;
}) => {
  const contentClass =
    "text-muted-foreground group-hover:text-primary transition-colors text-sm leading-relaxed";
  const cardContent = (
    <div className="flex items-start space-x-4">
      <Icon className="w-8 h-8 text-primary mt-1" />
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <div className={contentClass}>{content}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        {cardContent}
      </a>
    );
  }
  return <div className="group">{cardContent}</div>;
};

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
        description:
          "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-foreground relative glitch"
            data-text="Let's Connect"
          >
            Let's Connect
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach
            out.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-8">
            <ContactInfoCard
              icon={Mail}
              title="Email"
              content="subhashguptha308@gmail.com"
              href="mailto:subhashguptha308@gmail.com"
            />
            <ContactInfoCard
              icon={Phone}
              title="Phone"
              content="+91 7306677599"
              href="tel:+917306677599"
            />
            <ContactInfoCard
              icon={Linkedin}
              title="LinkedIn"
              content="linkedin.com/in/subhash-guptha-b65086290"
              href="https://www.linkedin.com/in/subhash-guptha-b65086290"
            />
            <ContactInfoCard
              icon={Github}
              title="GitHub"
              content="github.com/SubhashGuptha30"
              href="https://github.com/SubhashGuptha30"
            />
            <ContactInfoCard
              icon={MapPin}
              title="Location"
              content="Kakinada, Andhra Pradesh, India"
            />
          </div>
          <Card className="bg-card/80 backdrop-blur-sm border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            {...field}
                            disabled={isSubmitting}
                            className="bg-input border-primary/30 text-foreground placeholder-muted-foreground"
                          />
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
                          <Input
                            type="email"
                            placeholder="Your Email"
                            {...field}
                            disabled={isSubmitting}
                            className="bg-input border-primary/30 text-foreground placeholder-muted-foreground"
                          />
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
                          <Input
                            placeholder="Subject"
                            {...field}
                            disabled={isSubmitting}
                            className="bg-input border-primary/30 text-foreground placeholder-muted-foreground"
                          />
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
                          <Textarea
                            placeholder="Tell me about your project..."
                            rows={5}
                            {...field}
                            disabled={isSubmitting}
                            className="bg-input border-primary/30 text-foreground placeholder-muted-foreground resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Send Message <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default Contact;
