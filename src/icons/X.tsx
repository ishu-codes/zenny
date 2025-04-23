type Props = {
  className?: string;
  colorClass?: string;
};

export default function XIcon(props: Props) {
  const [className, colorClass] = [
    props.className ?? "",
    props.colorClass ?? "fill-foreground",
  ];
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3303_2)">
        <path
          d="M21.4284 15.2452L34.8324 0H31.6572L20.0136 13.2345L10.7208 0H0L14.0556 20.0149L0 35.9999H3.1752L15.4632 22.0208L25.2792 35.9999H36M4.3212 2.34284H9.1992L31.6548 33.7721H26.7756"
          className={colorClass}
        />
      </g>
      <defs>
        <clipPath id="clip0_3303_2">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
