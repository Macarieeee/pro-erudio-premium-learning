import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  icon: LucideIcon;
  features: string[];
}

const CourseCard = ({ title, description, level, icon: Icon, features }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border bg-card">
      <CardHeader>
        <div className="w-14 h-14 rounded-full bg-light-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <CardTitle className="text-2xl text-card-foreground">{title}</CardTitle>
        <CardDescription className="text-sm font-semibold text-primary">{level}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span className="text-sm text-card-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          Află mai multe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
