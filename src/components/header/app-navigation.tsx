import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbHandle } from "@/types/app-types";
import { Fragment } from "react";

import { useMatches } from "react-router";

export function HeaderNavigation() {
  const matches = useMatches();

  const breadcrumbs = matches.filter(
    (match) => (match.handle as BreadcrumbHandle | undefined)?.crumb,
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((match, index) => {
          const handle = match.handle as BreadcrumbHandle;
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={match.id}>
              {index > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{handle.crumb}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={match.pathname}>
                    {handle.crumb}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
