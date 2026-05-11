import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = { seed: number };

/** Light inverse of the reference: graphite lines / soft paper fills on white. */
const G = {
  line: (a: number) => `rgba(72, 74, 82, ${a})`,
  fill: (a: number) => `rgba(128, 132, 142, ${a})`,
  paper: (a: number) => `rgba(236, 238, 244, ${a})`,
};

function DotGrid({
  ox,
  oy,
  rows,
  cols,
  cell,
  alpha,
}: {
  ox: number;
  oy: number;
  rows: number;
  cols: number;
  cell: number;
  alpha: number;
}) {
  const nodes: ReactNode[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      nodes.push(
        <View
          key={`${r}-${c}`}
          style={[
            styles.gridDot,
            {
              left: ox + c * cell,
              top: oy + r * cell,
              backgroundColor: G.line(alpha),
            },
          ]}
        />,
      );
    }
  }
  return <>{nodes}</>;
}

function Pill({
  width,
  height,
  top,
  left,
  right,
  bottom,
  rotate,
  opacity,
}: {
  width: number;
  height: number;
  top?: number | `${number}%`;
  left?: number | `${number}%`;
  right?: number;
  bottom?: number;
  rotate: string;
  opacity: number;
}) {
  return (
    <View
      style={[
        styles.pill,
        {
          width,
          height,
          borderRadius: height / 2,
          top,
          left,
          right,
          bottom,
          opacity,
          backgroundColor: G.fill(0.2),
          transform: [{ rotate }],
        },
      ]}
    />
  );
}

function Plus({ x, y, size, alpha }: { x: number; y: number; size: number; alpha: number }) {
  const t = G.line(alpha);
  const half = size / 2;
  return (
    <View style={[styles.plusRoot, { left: x, top: y, width: size, height: size }]}>
      <View style={[styles.plusH, { top: half - 0.5, backgroundColor: t }]} />
      <View style={[styles.plusV, { left: half - 0.5, backgroundColor: t }]} />
    </View>
  );
}

function MiniSquare({ x, y, s, alpha }: { x: number; y: number; s: number; alpha: number }) {
  return (
    <View
      style={[
        styles.miniSq,
        { left: x, top: y, width: s, height: s, borderColor: G.line(alpha) },
      ]}
    />
  );
}

function MiniRing({ x, y, d, alpha }: { x: number; y: number; d: number; alpha: number }) {
  return (
    <View
      style={[
        styles.miniRing,
        {
          left: x,
          top: y,
          width: d,
          height: d,
          borderRadius: d / 2,
          borderColor: G.line(alpha),
        },
      ]}
    />
  );
}

function ConcentricCorner({
  size,
  count,
  alpha,
  anchor,
  offsetY = 0,
}: {
  size: number;
  count: number;
  alpha: number;
  anchor: 'tr' | 'br' | 'tl';
  offsetY?: number;
}) {
  const pos =
    anchor === 'tr'
      ? { top: 8, right: 6 }
      : anchor === 'br'
        ? { bottom: 12, right: 8 }
        : { top: 32 + offsetY, left: 6 };
  return (
    <View style={[styles.concHost, { width: size, height: size, ...pos }]}>
      {Array.from({ length: count }).map((_, i) => {
        const w = size - 4 - i * 11;
        if (w < 8) return null;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: w,
              height: w,
              borderRadius: w / 2,
              left: (size - w) / 2,
              top: (size - w) / 2,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: G.line(Math.max(0.04, alpha - i * 0.015)),
              backgroundColor: 'transparent',
            }}
          />
        );
      })}
    </View>
  );
}

function DiagonalHair({
  top,
  left,
  rotate,
  opacity,
}: {
  top: `${number}%` | number;
  left: `${number}%` | number;
  rotate: string;
  opacity: number;
}) {
  return (
    <View
      style={[
        styles.hairDiag,
        {
          top,
          left,
          opacity,
          transform: [{ rotate }],
        },
      ]}
    />
  );
}

/**
 * Light-mode abstract card interior: layered blobs, diagonal pills, dot grids, concentric arcs, micro marks.
 */
export function FieldCardTexture({ seed }: Props) {
  const pack = (((seed * 13) ^ (seed >>> 2) ^ (seed >> 6)) >>> 0) % 6;
  const jx = (seed % 7) - 3;
  const jy = ((seed >> 3) % 7) - 3;
  const r1 = -38 + (seed % 11) * 2;
  const r2 = 20 + (seed % 9) * 2;

  return (
    <View style={styles.root} pointerEvents="none">
      <View style={[styles.orgA, { transform: [{ translateX: jx * 2 }, { translateY: jy }] }]} />
      <View style={[styles.orgB, pack % 2 === 1 && styles.orgBFade]} />
      {(pack === 0 || pack === 2 || pack === 4) && (
        <View style={[styles.orgC, { top: 18 + jy, right: -30 + (seed % 6) * 5 }]} />
      )}

      {(pack <= 2 || pack === 5) && (
        <Pill
          width={96 + (seed % 7) * 12}
          height={6}
          top={12 + jy}
          right={-2}
          rotate={`${r1}deg`}
          opacity={0.58}
        />
      )}
      {(pack === 1 || pack === 2 || pack === 3 || pack === 5) && (
        <Pill
          width={70 + (seed % 5) * 10}
          height={5}
          bottom={28 - jy}
          left={-2}
          rotate={`${r2}deg`}
          opacity={0.5}
        />
      )}
      {pack === 4 && (
        <Pill
          width={88}
          height={4}
          top="38%"
          left={14 + jx}
          rotate={`${-12 + (seed % 15)}deg`}
          opacity={0.46}
        />
      )}

      {(pack === 0 || pack === 2 || pack === 5) && (
        <DiagonalHair top="50%" left="-10%" rotate="-36deg" opacity={0.38} />
      )}
      {(pack === 1 || pack === 3 || pack === 4) && (
        <DiagonalHair top="20%" left="2%" rotate="42deg" opacity={0.32} />
      )}
      {pack === 3 && <DiagonalHair top="66%" left="32%" rotate="-10deg" opacity={0.26} />}

      {(pack === 0 || pack === 1 || pack === 5) && (
        <DotGrid ox={8 + jx} oy={10 + jy} rows={4} cols={4} cell={5} alpha={0.11} />
      )}
      {(pack === 2 || pack === 4) && (
        <DotGrid ox={118 + jx} oy={52 + jy} rows={3} cols={5} cell={4} alpha={0.1} />
      )}

      {(pack === 0 || pack === 3 || pack === 5) && (
        <ConcentricCorner size={62} count={4} alpha={0.125} anchor="tr" />
      )}
      {(pack === 1 || pack === 4) && (
        <ConcentricCorner size={54} count={3} alpha={0.115} anchor="br" />
      )}
      {pack === 2 && (
        <ConcentricCorner size={58} count={4} alpha={0.12} anchor="tl" offsetY={jy} />
      )}

      <Plus x={28 + (seed % 4) * 3} y={44 + (seed % 3) * 2} size={9} alpha={0.17 + (pack % 3) * 0.025} />
      {(pack === 1 || pack === 3 || pack === 5) && (
        <Plus x={132 + jx} y={22 + jy} size={8} alpha={0.15} />
      )}

      <MiniSquare x={72 + jx} y={18 + jy} s={5} alpha={0.15} />
      {(pack === 2 || pack === 4) && <MiniSquare x={24 + jx} y={68 + jy} s={4} alpha={0.125} />}

      <MiniRing x={148 + jx} y={56 + jy} d={6} alpha={0.14} />
      {(pack === 0 || pack === 5) && <MiniRing x={18 + jx} y={78 + jy} d={5} alpha={0.125} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  orgA: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    left: -56,
    bottom: -48,
    backgroundColor: G.paper(0.92),
  },
  orgB: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    right: -40,
    top: -36,
    backgroundColor: G.paper(0.84),
  },
  orgBFade: {
    opacity: 0.64,
  },
  orgC: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: G.fill(0.11),
  },
  pill: {
    position: 'absolute',
  },
  gridDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
  },
  hairDiag: {
    position: 'absolute',
    width: '160%',
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: 'rgba(72, 74, 82, 0.42)',
  },
  concHost: {
    position: 'absolute',
  },
  plusRoot: {
    position: 'absolute',
  },
  plusH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
  plusV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
  },
  miniSq: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  miniRing: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
});
