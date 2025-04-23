type Props = {
  className?: string;
  colorClass?: string;
};

export default function LinkedInIcon(props: Props) {
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
      <g clipPath="url(#clip0_3303_9)">
        <path
          className={colorClass}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 36H32C34.2091 36 36 34.2091 36 32V4C36 1.79086 34.2091 0 32 0H4C1.79086 0 0 1.79086 0 4V32C0 34.2091 1.79086 36 4 36Z"
          fill="#007EBB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31 31H25.6578V21.9011C25.6578 19.4064 24.7099 18.0123 22.7354 18.0123C20.5873 18.0123 19.465 19.4631 19.465 21.9011V31H14.3167V13.6667H19.465V16.0015C19.465 16.0015 21.013 13.1371 24.6913 13.1371C28.3678 13.1371 31 15.3822 31 20.0256V31ZM8.17467 11.397C6.42103 11.397 5 9.96483 5 8.1985C5 6.43218 6.42103 5 8.17467 5C9.92832 5 11.3485 6.43218 11.3485 8.1985C11.3485 9.96483 9.92832 11.397 8.17467 11.397ZM5.51628 31H10.8847V13.6667H5.51628V31Z"
          className="fill-background"
        />
      </g>
      <defs>
        <clipPath id="clip0_3303_9">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
