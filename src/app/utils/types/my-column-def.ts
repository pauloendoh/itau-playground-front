import { InputSignal, Type } from '@angular/core';

type ComponentInputs<TComponent> = {
  [K in keyof TComponent as TComponent[K] extends InputSignal<any>
    ? K
    : never]: TComponent[K] extends InputSignal<infer T> ? T : never;
};

export function withComponent<TComponent, TRowItem>(
  component: Type<TComponent>,
  componentInputs: (item: TRowItem) => ComponentInputs<TComponent>,
) {
  return { component, componentInputs };
}

type MyColumnDef<TRowItem> = {
  columnId: keyof TRowItem;
  headerLabel: string;
} & CellProps<TRowItem>;

type CellProps<TRowItem> =
  | { cellText: (item: TRowItem) => string }
  | {
      cellText?: false;
      cellComponent: {
        component: Type<unknown>;
        componentInputs: (item: TRowItem) => Record<string, unknown>;
      };
    };

export type MyColumnDefs<TRowItem> = MyColumnDef<TRowItem>[];
