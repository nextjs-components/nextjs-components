import { DesignLayout, DesignLayoutInner } from "../layouts/DesignLayout";
import DocsLayout from "../layouts/docs";

export default function DocsView({ children, paths }) {
  return (
    <DocsLayout>
      <DesignLayout paths={paths}>
        <DesignLayoutInner>{children}</DesignLayoutInner>
      </DesignLayout>
    </DocsLayout>
  );
}
