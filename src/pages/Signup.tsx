import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authActions } = useAuth();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await authActions.register(data.email, data.password, data.name);
      toast({
        title: "Account created!",
        description: "Please select your dashboard features",
      });
      // Redirect to feature selection after successful registration
      navigate("/select-features");
    } catch (error: unknown) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Join our supply chain platform</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input 
              {...register("name")} 
              placeholder="John Doe"
              className={errors.name && "border-red-500"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              {...register("email")} 
              type="email" 
              placeholder="your@email.com"
              className={errors.email && "border-red-500"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input 
              {...register("password")} 
              type="password" 
              placeholder="••••••••"
              className={errors.password && "border-red-500"}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Must be at least 8 characters with 1 uppercase letter and 1 number
            </p>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <Input 
              {...register("confirmPassword")} 
              type="password" 
              placeholder="••••••••"
              className={errors.confirmPassword && "border-red-500"}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          Already have an account?{" "}
          <button 
            onClick={() => navigate("/login")} 
            className="font-medium text-primary hover:text-primary/80"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}