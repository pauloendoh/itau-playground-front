import { TemplateRef } from '@angular/core';

type MyColumnDef<TRowItem> = {
  columnId: keyof TRowItem;
  headerLabel: string;
} & CellProps<TRowItem>;

type CellProps<TRowItem> =
  | { cellText: (item: TRowItem) => string | null }
  | {
      cellText?: false;
      cellTemplate: TemplateRef<{ $implicit: TRowItem }>;
    };

export type MyColumnDefs<TRowItem> = MyColumnDef<TRowItem>[];
