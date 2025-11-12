"use client";

import CatalogePage from "@/components/test/CatalogePage";
import { chips } from "@/lib/util";


export default function SelectedPage() {
  return (
    <>
      <CatalogePage catalogeName={chips[1]}></CatalogePage>
    </>
  );
}