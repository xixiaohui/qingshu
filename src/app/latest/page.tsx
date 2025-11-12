"use client";

import CatalogePage from "@/components/test/CatalogePage";
import { chips, LATEST } from "@/lib/util";






export default function LatestPage() {
  return (
    <CatalogePage catalogeName={LATEST}></CatalogePage>
  );
}
