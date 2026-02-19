import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Icon } from "@/components/ui/icons";

export interface BlogBreadcrumbItem {
  label: string;
  href?: string;
}

export interface BlogBreadcrumbsProps {
  items: BlogBreadcrumbItem[];
  className?: string;
}

export function BlogBreadcrumbs({ items, className }: BlogBreadcrumbsProps) {
  if (!items?.length) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isSecondToLast = index === items.length - 2;
          return (
            <span key={index} className="contents">
              <BreadcrumbItem className={isLast ? "hidden md:flex" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className={isSecondToLast ? "hidden md:flex" : ""}>
                  <Icon name="angleRight" size="md" />
                </BreadcrumbSeparator>
              )}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
