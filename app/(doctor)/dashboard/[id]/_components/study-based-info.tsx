export default function StudyBasedInfo({
  title,
  info,
}: {
  title: string;
  info: string | undefined;
}) {
  return (
    <div className="flex flex-col">
      <div className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0">
        {title}
      </div>
      <div className="text-base text-muted-foreground">{info}</div>
    </div>
  );
}
