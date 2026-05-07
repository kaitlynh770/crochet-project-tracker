import styles from '../pages_styling/ProjectDetails.module.scss';

/**
 * Under layer: blade B only (the stroke/right handle blade).
 * Sits below the stitch border. No hinge — hinge is on the over layer.
 */
export function CompleteProjectScissorUnder() {
  return (
    <svg
      className={styles.complete_button__scissor_svg}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="completeProjectBladeB">
        <path
          d="M546.71 683.333L200 66.6665M733.333 633.333C733.333 688.563 688.563 733.333 633.333 733.333C578.103 733.333 533.333 688.563 533.333 633.333C533.333 578.103 578.103 533.333 633.333 533.333C688.563 533.333 733.333 578.103 733.333 633.333Z"
          stroke="#E4D4D2"
          strokeWidth="50"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * Over layer: blade A + hinge (the filled/left handle blade).
 * Sits above the stitch border, so blade A appears to cross over blade B at the hinge.
 */
export function CompleteProjectScissorOver() {
  return (
    <svg
      className={styles.complete_button__scissor_svg}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="completeProjectBladeA">
        <path
          d="M166.667 708.333C180.474 708.333 191.667 719.527 191.667 733.333C191.667 747.14 180.474 758.333 166.667 758.333V708.333ZM291.667 633.333V658.333H241.667V633.333H291.667ZM275.08 695.587C268.314 707.62 253.072 711.893 241.036 705.127C229.001 698.36 224.73 683.117 231.497 671.08L275.08 695.587ZM578.207 54.4146C584.973 42.3793 600.217 38.108 612.253 44.8746C624.287 51.6413 628.56 66.8833 621.793 78.9186L578.207 54.4146ZM91.6667 633.333C91.6667 674.753 125.245 708.333 166.667 708.333V758.333C97.6311 758.333 41.6667 702.37 41.6667 633.333H91.6667ZM241.667 633.333C241.667 591.913 208.088 558.333 166.667 558.333V508.333C235.702 508.333 291.667 564.297 291.667 633.333H241.667ZM166.667 558.333C125.245 558.333 91.6667 591.913 91.6667 633.333H41.6667C41.6667 564.297 97.6311 508.333 166.667 508.333V558.333ZM231.497 671.08L578.207 54.4146L621.793 78.9186L275.08 695.587L231.497 671.08Z"
          fill="#E4D4D2"
        />
      </g>
      <g className="completeProjectHinge">
        <circle cx="399.5" cy="418.5" r="48.5" fill="#E4D4D2" />
      </g>
    </svg>
  );
}