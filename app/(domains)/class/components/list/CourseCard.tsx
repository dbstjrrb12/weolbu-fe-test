interface CourseCardProps {
  title: string;
  price: number;
  instructorName: string;
  currentStudents: number;
  maxStudents: number;
}

export default function CourseCard({
  title,
  price,
  instructorName,
  currentStudents,
  maxStudents,
}: CourseCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between">
        <h2 className="">{title}</h2>
        <span className=" font-bold">{price.toLocaleString()}원</span>
      </div>

      <div className="flex justify-between">
        <p>강사명: {instructorName}</p>
        <span>
          {currentStudents}/{maxStudents}
        </span>
      </div>
    </div>
  );
}
