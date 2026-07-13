export type MyColumnDefs<TRowItem> = {
  columnId: keyof TRowItem;
  headerLabel: string;
  cellContent: (item: TRowItem) => string | null;
}[];
