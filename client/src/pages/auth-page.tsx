import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop } from "lucide-react";

export default function AuthPage() {
  const { loginMutation, registerMutation, user } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-[#1C1C1E] to-[#7A6F92]">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md mx-auto backdrop-blur-lg bg-[#2E2E2F]/80">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2 text-white">
              <Laptop className="h-6 w-6" />
              Premium Tech
            </CardTitle>
            <CardDescription className="text-[#C0C0C0]">
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 bg-[#2E2E2F]">
                <TabsTrigger value="login" className="text-[#C0C0C0] data-[state=active]:text-white">Login</TabsTrigger>
                <TabsTrigger value="register" className="text-[#C0C0C0] data-[state=active]:text-white">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    loginMutation.mutate({
                      username: formData.get("username") as string,
                      password: formData.get("password") as string,
                    });
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="text-[#C0C0C0]">Username</Label>
                      <Input 
                        id="username" 
                        name="username" 
                        required 
                        className="bg-black text-white placeholder:text-[#B0B0B0]"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-[#C0C0C0]">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="bg-black text-white placeholder:text-[#B0B0B0]"
                        placeholder="Enter your password"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#A88EE0] hover:bg-[#A88EE0]/90 text-white"
                      disabled={loginMutation.isPending}
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    registerMutation.mutate({
                      username: formData.get("username") as string,
                      password: formData.get("password") as string,
                    });
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reg-username" className="text-[#C0C0C0]">Username</Label>
                      <Input 
                        id="reg-username" 
                        name="username" 
                        required 
                        className="bg-black text-white placeholder:text-[#B0B0B0]"
                        placeholder="Choose a username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-password" className="text-[#C0C0C0]">Password</Label>
                      <Input
                        id="reg-password"
                        name="password"
                        type="password"
                        required
                        className="bg-black text-white placeholder:text-[#B0B0B0]"
                        placeholder="Choose a password"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#A88EE0] hover:bg-[#A88EE0]/90 text-white"
                      disabled={registerMutation.isPending}
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block bg-transparent p-12">
        <div className="h-full flex items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Welcome to Premium Tech</h1>
            <p className="text-lg text-[#C0C0C0]">
              Discover our exclusive collection of premium technology products.
              Experience innovation and quality like never before.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}