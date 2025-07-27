import { cn } from "@/lib/utils";

export default function AnswerChartBar({
  answerCount,
}: {
  answerCount: number | null;
}) {
  const maxAnswers = 21;
  if (answerCount === null || answerCount === undefined) {
    return (
      <div className="flex h-5 w-full" role="progressbar" aria-valuenow={0}>
        <div className="h-full w-full bg-primary"></div>
      </div>
    );
  }

  const availableWidthForDynamicParts = 90;

  const completedWidth =
    (Math.min(answerCount, maxAnswers) / maxAnswers) *
    availableWidthForDynamicParts;

  const remainingWidth = availableWidthForDynamicParts - completedWidth;

  return (
    <div
      className="flex h-5 w-full gap-1"
      role="progressbar"
      aria-valuenow={answerCount}
      aria-valuemin={0}
      aria-valuemax={maxAnswers}
    >
      {completedWidth > 0 && (
        <div
          className="h-full bg-primary rounded-tl rounded-bl"
          style={{ width: `${completedWidth}%` }}
        ></div>
      )}

      <div
        className="h-full bg-gradient-to-r from-primary to-foreground"
        style={{ width: "15%" }}
      ></div>

      <div
        className={cn(
          remainingWidth === 0 && "rounded-tr rounded-br",
          "h-full bg-gradient-to-r from-foreground to-destructive"
        )}
        style={{ width: "15%" }}
      ></div>

      {remainingWidth > 0 && (
        <div
          className="h-full bg-destructive rounded-tr rounded-br"
          style={{ width: `${remainingWidth}%` }}
        ></div>
      )}
    </div>
  );
}
