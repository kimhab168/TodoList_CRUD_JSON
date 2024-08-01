export interface tasks {
  id: number;
  text: string;
  isCompleted: boolean;
  isEdit: boolean;
}

const data: tasks[] = [
  { id: 1, text: "Breakfast", isCompleted: false, isEdit: false },
  { id: 2, text: "Washing up", isCompleted: false, isEdit: false },
  { id: 3, text: "Drink Beer", isCompleted: false, isEdit: false },
  { id: 4, text: "Smoking", isCompleted: false, isEdit: false },
  { id: 5, text: "Sleep", isCompleted: false, isEdit: false },
];
export { data };
// POST = Create
// GET = Read
// PUT = Update
// DELETE = Delete