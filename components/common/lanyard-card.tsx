"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  type ThreeEvent,
  useFrame,
} from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
  type RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { profile } from "@/constants/portfolio.constants";

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const CARD_SIZE = {
  depth: 0.08,
  height: 2.32,
  width: 1.58,
} as const;

const CARD_FACE_SIZE = {
  height: 2.12,
  width: 1.42,
} as const;

const CARD_GROUP_POSITION: [number, number, number] = [0, -1.2, -0.05];
const CANVAS_HEIGHT = 1536;
const CANVAS_WIDTH = 1024;
const FRONT_STACK = "React · Next · Node";
const HANDLE_LABEL = `@${profile.githubUrl.split("/").pop()?.toLowerCase() ?? "jay-scripts"}`;
const STATUS_LABEL = "Open";

const FRONT_DETAIL_ROWS = [
  { label: "LOCATION", value: "Manila, PH" },
  { label: "STACK", value: FRONT_STACK },
  { label: "STATUS", value: STATUS_LABEL },
] as const;

const BACK_SKILL_BADGES = [
  {
    background: "#f7df1e",
    foreground: "#12100e",
    height: 122,
    label: "JS",
    rotation: -0.12,
    width: 136,
    x: 198,
    y: 286,
  },
  {
    background: "#3178c6",
    foreground: "#eff8ff",
    height: 116,
    label: "TS",
    rotation: 0.08,
    width: 128,
    x: 388,
    y: 284,
  },
  {
    background: "#1b2230",
    foreground: "#63dafb",
    height: 126,
    label: "React",
    rotation: 0.09,
    width: 144,
    x: 611,
    y: 258,
  },
  {
    background: "#0f131b",
    foreground: "#f8fafc",
    height: 116,
    label: "Next",
    rotation: 0.14,
    width: 116,
    x: 168,
    y: 610,
  },
  {
    background: "#38bdf8",
    foreground: "#052033",
    height: 118,
    label: "Tailwind",
    rotation: -0.08,
    width: 144,
    x: 612,
    y: 590,
  },
  {
    background: "#3ecf8e",
    foreground: "#032412",
    height: 126,
    label: "Supabase",
    rotation: -0.16,
    width: 146,
    x: 204,
    y: 936,
  },
  {
    background: "#336791",
    foreground: "#eef6ff",
    height: 122,
    label: "Postgres",
    rotation: 0.11,
    width: 138,
    x: 620,
    y: 936,
  },
  {
    background: "#7c6dd8",
    foreground: "#f6f2ff",
    height: 108,
    label: "PHP",
    rotation: -0.05,
    width: 222,
    x: 380,
    y: 1220,
  },
] as const;

type MeshLineMesh = THREE.Mesh<MeshLineGeometry, MeshLineMaterial>;
type PointerCaptureTarget = EventTarget & {
  releasePointerCapture: (pointerId: number) => void;
  setPointerCapture: (pointerId: number) => void;
};

export interface LanyardCardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  className?: string;
}

interface BandProps {
  frontImage: string | null;
  backImage: string | null;
  isMobile?: boolean;
  imageFit: "cover" | "contain";
  lanyardImage: string | null;
  lanyardWidth?: number;
  maxSpeed?: number;
  minSpeed?: number;
}

/**
 * Renders an interactive 3D ID lanyard with a stylized dual-face profile card for the About section.
 */
export const LanyardCard = ({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 0.75,
  className = "",
}: LanyardCardProps) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative min-h-[22rem] w-full ${className}`}>
      <Canvas
        camera={{ fov, position }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI * 0.7} />

        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            backImage={backImage}
            frontImage={frontImage}
            imageFit={imageFit}
            isMobile={isMobile}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>

        <Environment blur={0.8}>
          <Lightformer
            color="#a78bfa"
            intensity={2}
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            color="#ffffff"
            intensity={2.4}
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            color="#38bdf8"
            intensity={2.8}
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            color="#7c3aed"
            intensity={8}
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
};

const createCanvasTexture = (draw: (context: CanvasRenderingContext2D) => void) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  if (!context) {
    const fallbackTexture = new THREE.Texture();
    fallbackTexture.needsUpdate = true;
    return fallbackTexture;
  }

  draw(context);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
};

const roundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height,
  );
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
};

const drawHexagon = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
) => {
  context.beginPath();

  for (let index = 0; index < 6; index += 1) {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }

  context.closePath();
};

const drawFaceBackground = (
  context: CanvasRenderingContext2D,
  showGrid: boolean,
) => {
  const gradient = context.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, "#0b0914");
  gradient.addColorStop(0.55, "#090812");
  gradient.addColorStop(1, "#06060d");

  context.fillStyle = gradient;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const glow = context.createRadialGradient(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT * 0.1,
    20,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT * 0.35,
    CANVAS_WIDTH * 0.78,
  );
  glow.addColorStop(0, "rgba(124, 58, 237, 0.20)");
  glow.addColorStop(0.5, "rgba(76, 29, 149, 0.10)");
  glow.addColorStop(1, "rgba(6, 6, 13, 0)");

  context.fillStyle = glow;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (showGrid) {
    context.strokeStyle = "rgba(99, 102, 241, 0.08)";
    context.lineWidth = 2;

    for (let x = 92; x < CANVAS_WIDTH; x += 104) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, CANVAS_HEIGHT);
      context.stroke();
    }

    for (let y = 120; y < CANVAS_HEIGHT; y += 112) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(CANVAS_WIDTH, y);
      context.stroke();
    }
  }

  context.fillStyle = "rgba(167, 139, 250, 0.24)";
  const dots = [
    [128, 164],
    [862, 212],
    [910, 450],
    [156, 968],
    [870, 1430],
    [758, 1226],
    [252, 1120],
  ] as const;

  dots.forEach(([x, y], index) => {
    context.globalAlpha = index % 2 === 0 ? 0.7 : 0.4;
    context.beginPath();
    context.arc(x, y, index % 3 === 0 ? 4 : 3, 0, Math.PI * 2);
    context.fill();
  });

  context.globalAlpha = 1;
};

const drawTopSlot = (context: CanvasRenderingContext2D) => {
  context.fillStyle = "#151326";
  roundedRect(context, CANVAS_WIDTH / 2 - 50, 34, 100, 58, 18);
  context.fill();

  context.strokeStyle = "rgba(255, 255, 255, 0.12)";
  context.lineWidth = 4;
  roundedRect(context, CANVAS_WIDTH / 2 - 50, 34, 100, 58, 18);
  context.stroke();

  context.fillStyle = "#090812";
  roundedRect(context, CANVAS_WIDTH / 2 - 24, 46, 48, 34, 12);
  context.fill();

  context.strokeStyle = "rgba(167, 139, 250, 0.24)";
  context.lineWidth = 2;
  roundedRect(context, CANVAS_WIDTH / 2 - 24, 46, 48, 34, 12);
  context.stroke();
};

const drawBottomAccents = (context: CanvasRenderingContext2D) => {
  context.fillStyle = "#6d4cff";
  context.fillRect(84, CANVAS_HEIGHT - 44, 310, 10);
  context.fillRect(CANVAS_WIDTH - 394, CANVAS_HEIGHT - 44, 310, 10);

  context.fillStyle = "rgba(109, 76, 255, 0.32)";
  context.fillRect(418, CANVAS_HEIGHT - 44, 188, 10);
};

const drawImageInFrame = (
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number,
  imageFit: "cover" | "contain",
) => {
  const measuredImage = image as { height?: number; width?: number };

  if (!measuredImage.width || !measuredImage.height) {
    return;
  }

  const targetRatio = width / height;
  const imageRatio = measuredImage.width / measuredImage.height;
  const shouldUseWidth =
    imageFit === "cover" ? imageRatio > targetRatio : imageRatio < targetRatio;

  const drawWidth = shouldUseWidth ? height * imageRatio : width;
  const drawHeight = shouldUseWidth ? height : width / imageRatio;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
};

const drawAvatarGraphic = (
  context: CanvasRenderingContext2D,
  frontSource: THREE.Texture,
  imageFit: "cover" | "contain",
) => {
  const centerX = CANVAS_WIDTH / 2;
  const centerY = 372;

  context.shadowColor = "rgba(139, 92, 246, 0.48)";
  context.shadowBlur = 28;
  context.strokeStyle = "#8b5cf6";
  context.lineWidth = 8;
  drawHexagon(context, centerX, centerY, 146);
  context.stroke();

  context.shadowBlur = 0;
  context.strokeStyle = "rgba(167, 139, 250, 0.85)";
  context.lineWidth = 3;
  drawHexagon(context, centerX, centerY, 130);
  context.stroke();

  context.fillStyle = "rgba(124, 58, 237, 0.22)";
  drawHexagon(context, centerX, centerY, 126);
  context.fill();

  context.save();
  context.beginPath();
  context.arc(centerX, centerY - 4, 78, 0, Math.PI * 2);
  context.closePath();
  context.clip();

  if (frontSource.image) {
    drawImageInFrame(
      context,
      frontSource.image as CanvasImageSource,
      centerX - 82,
      centerY - 86,
      164,
      176,
      imageFit,
    );
  } else {
    context.fillStyle = "rgba(255, 255, 255, 0.08)";
    context.fillRect(centerX - 82, centerY - 86, 164, 176);
  }

  context.restore();

  context.fillStyle = "rgba(124, 58, 237, 0.35)";
  context.beginPath();
  context.moveTo(centerX, centerY + 92);
  context.lineTo(centerX + 92, centerY + 152);
  context.lineTo(centerX - 92, centerY + 152);
  context.closePath();
  context.fill();
};

const drawFrontFace = (
  context: CanvasRenderingContext2D,
  frontSource: THREE.Texture,
  imageFit: "cover" | "contain",
) => {
  drawFaceBackground(context, false);
  drawTopSlot(context);
  drawAvatarGraphic(context, frontSource, imageFit);

  context.strokeStyle = "rgba(255, 255, 255, 0.06)";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(116, 820);
  context.lineTo(CANVAS_WIDTH - 116, 820);
  context.stroke();

  context.fillStyle = "#f8fafc";
  context.font = "700 68px system-ui, sans-serif";
  context.textAlign = "center";
  context.fillText(profile.name, CANVAS_WIDTH / 2, 700);

  context.fillStyle = "rgba(255, 255, 255, 0.10)";
  roundedRect(context, CANVAS_WIDTH / 2 - 126, 738, 252, 60, 30);
  context.fill();
  context.strokeStyle = "rgba(109, 76, 255, 0.45)";
  context.lineWidth = 3;
  roundedRect(context, CANVAS_WIDTH / 2 - 126, 738, 252, 60, 30);
  context.stroke();

  context.fillStyle = "#a78bfa";
  context.font = "500 32px system-ui, sans-serif";
  context.fillText(profile.role, CANVAS_WIDTH / 2, 779);

  let rowY = 904;
  FRONT_DETAIL_ROWS.forEach(({ label, value }) => {
    context.fillStyle = "rgba(167, 139, 250, 0.70)";
    context.font = "600 22px monospace";
    context.textAlign = "left";
    context.fillText(label, 118, rowY);

    if (label === "STATUS") {
      context.fillStyle = "rgba(34, 197, 94, 0.14)";
      roundedRect(context, 646, rowY - 28, 144, 42, 20);
      context.fill();

      context.fillStyle = "#22c55e";
      context.beginPath();
      context.arc(674, rowY - 7, 6, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "#dcfce7";
      context.font = "600 24px system-ui, sans-serif";
      context.textAlign = "left";
      context.fillText(value.toLowerCase(), 692, rowY + 2);
    } else {
      context.fillStyle = "#d8def8";
      context.font = "500 28px system-ui, sans-serif";
      context.textAlign = "right";
      context.fillText(value, CANVAS_WIDTH - 118, rowY + 2);
    }

    rowY += 74;
  });

  context.strokeStyle = "rgba(255, 255, 255, 0.06)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(116, 1126);
  context.lineTo(CANVAS_WIDTH - 116, 1126);
  context.stroke();

  context.fillStyle = "#8b7cf6";
  context.font = "500 28px monospace";
  context.textAlign = "center";
  context.fillText(HANDLE_LABEL, CANVAS_WIDTH / 2, 1190);

  context.fillStyle = "rgba(139, 124, 246, 0.18)";
  roundedRect(context, CANVAS_WIDTH / 2 - 118, 1236, 236, 172, 20);
  context.fill();

  const qrSquares = [
    [0, 0],
    [1, 0],
    [3, 0],
    [5, 0],
    [1, 1],
    [2, 1],
    [4, 1],
    [0, 2],
    [2, 2],
    [4, 2],
    [5, 2],
    [0, 3],
    [1, 3],
    [3, 3],
    [5, 3],
    [2, 4],
    [3, 4],
    [5, 4],
    [0, 5],
    [2, 5],
    [4, 5],
    [5, 5],
  ] as const;

  context.fillStyle = "rgba(255, 255, 255, 0.12)";
  qrSquares.forEach(([column, row]) => {
    context.fillRect(
      CANVAS_WIDTH / 2 - 102 + column * 34,
      1256 + row * 24,
      22,
      18,
    );
  });

  drawBottomAccents(context);
};

const drawSticker = (
  context: CanvasRenderingContext2D,
  options: (typeof BACK_SKILL_BADGES)[number],
) => {
  context.save();
  context.translate(options.x, options.y);
  context.rotate(options.rotation);

  context.shadowColor = "rgba(0, 0, 0, 0.45)";
  context.shadowBlur = 24;
  context.fillStyle = options.background;
  roundedRect(
    context,
    -options.width / 2,
    -options.height / 2,
    options.width,
    options.height,
    26,
  );
  context.fill();

  context.shadowBlur = 0;
  context.strokeStyle = "rgba(255, 255, 255, 0.16)";
  context.lineWidth = 3;
  roundedRect(
    context,
    -options.width / 2,
    -options.height / 2,
    options.width,
    options.height,
    26,
  );
  context.stroke();

  context.fillStyle = options.foreground;
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (options.label === "React") {
    context.strokeStyle = options.foreground;
    context.lineWidth = 6;

    for (let index = 0; index < 3; index += 1) {
      context.save();
      context.rotate((Math.PI / 3) * index);
      context.beginPath();
      context.ellipse(0, 0, 42, 18, 0, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    context.beginPath();
    context.arc(0, 0, 7, 0, Math.PI * 2);
    context.fill();
  } else if (options.label === "Tailwind") {
    context.font = "700 34px system-ui, sans-serif";
    context.fillText("~", -12, -10);
    context.fillText("~", 18, 8);
  } else if (options.label === "Supabase") {
    context.beginPath();
    context.moveTo(-34, 24);
    context.lineTo(-8, -28);
    context.lineTo(42, -6);
    context.lineTo(14, 46);
    context.closePath();
    context.strokeStyle = options.foreground;
    context.lineWidth = 8;
    context.stroke();
  } else if (options.label === "Postgres") {
    context.font = "700 28px system-ui, sans-serif";
    context.fillText("DB", 0, 2);
  } else {
    context.font = options.label.length > 3 ? "800 30px system-ui, sans-serif" : "800 46px system-ui, sans-serif";
    context.fillText(options.label, 0, 4);
  }

  context.restore();
};

const drawBackFace = (
  context: CanvasRenderingContext2D,
  backSource: THREE.Texture,
  imageFit: "cover" | "contain",
) => {
  drawFaceBackground(context, true);
  drawTopSlot(context);

  if (backSource.image) {
    context.save();
    context.globalAlpha = 0.08;
    drawImageInFrame(
      context,
      backSource.image as CanvasImageSource,
      194,
      314,
      636,
      860,
      imageFit,
    );
    context.restore();
  }

  BACK_SKILL_BADGES.forEach((badge) => {
    drawSticker(context, badge);
  });

  drawBottomAccents(context);
};

const createFrontFaceTexture = (
  frontSource: THREE.Texture,
  imageFit: "cover" | "contain",
) =>
  createCanvasTexture((context) => {
    drawFrontFace(context, frontSource, imageFit);
  });

const createBackFaceTexture = (
  backSource: THREE.Texture,
  imageFit: "cover" | "contain",
) =>
  createCanvasTexture((context) => {
    drawBackFace(context, backSource, imageFit);
  });

const createConfiguredLanyardTexture = (source: THREE.Texture) => {
  const texture = source.clone();

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(-4, 1);
  texture.needsUpdate = true;

  return texture;
};

const createStripedLanyardTexture = () =>
  createCanvasTexture((context) => {
    const gradient = context.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
    gradient.addColorStop(0, "#171228");
    gradient.addColorStop(0.5, "#251b45");
    gradient.addColorStop(1, "#171228");

    context.fillStyle = gradient;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.fillStyle = "#7c3aed";
    context.fillRect(CANVAS_WIDTH * 0.28, 0, 18, CANVAS_HEIGHT);
    context.fillRect(CANVAS_WIDTH * 0.72, 0, 18, CANVAS_HEIGHT);

    context.fillStyle = "rgba(196, 181, 253, 0.9)";
    for (let y = 30; y < CANVAS_HEIGHT; y += 70) {
      context.fillRect(CANVAS_WIDTH * 0.5 - 72, y, 144, 8);
    }
  });

const Band = ({
  frontImage,
  backImage,
  isMobile = false,
  imageFit,
  lanyardImage,
  lanyardWidth = 0.75,
  maxSpeed = 50,
  minSpeed = 0,
}: BandProps) => {
  const frontSource = useTexture(frontImage ?? BLANK_PIXEL);
  const backSource = useTexture(backImage ?? BLANK_PIXEL);
  const lanyardSource = useTexture(lanyardImage ?? BLANK_PIXEL);
  const band = useRef<MeshLineMesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const j1Lerped = useRef(new THREE.Vector3());
  const j2Lerped = useRef(new THREE.Vector3());
  const hasInitializedLerp = useRef(false);

  const frontMap = useMemo(
    () => createFrontFaceTexture(frontSource, imageFit),
    [frontSource, imageFit],
  );
  const backMap = useMemo(
    () => createBackFaceTexture(backSource, imageFit),
    [backSource, imageFit],
  );
  const lanyardMap = useMemo(
    () =>
      lanyardImage
        ? createConfiguredLanyardTexture(lanyardSource)
        : createStripedLanyardTexture(),
    [lanyardImage, lanyardSource],
  );

  const vectors = useMemo(
    () => ({
      angularVelocity: new THREE.Vector3(),
      direction: new THREE.Vector3(),
      pointerOffset: new THREE.Vector3(),
      pointerWorld: new THREE.Vector3(),
      rotationVector: new THREE.Vector3(),
    }),
    [],
  );

  const curve = useMemo(() => {
    const nextCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);

    nextCurve.curveType = "chordal";

    return nextCurve;
  }, []);

  const ropeGeometry = useMemo(() => new MeshLineGeometry(), []);
  const ropeMaterial = useMemo(() => {
    const material = new MeshLineMaterial({
      color: "white",
      lineWidth: lanyardWidth,
      map: lanyardMap,
      repeat: new THREE.Vector2(-4, 1),
      resolution: new THREE.Vector2(1000, isMobile ? 2000 : 1000),
      useMap: 1,
    });

    material.depthTest = false;
    material.transparent = true;

    return material;
  }, [isMobile, lanyardMap, lanyardWidth]);

  const segmentProps = useMemo<RigidBodyProps>(
    () => ({
      angularDamping: 4,
      canSleep: true,
      colliders: false,
      linearDamping: 4,
      type: "dynamic",
    }),
    [],
  );

  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (!hovered) {
      return undefined;
    }

    document.body.style.cursor = dragged ? "grabbing" : "grab";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useEffect(
    () => () => {
      frontMap.dispose();
      backMap.dispose();
      lanyardMap.dispose();
    },
    [frontMap, backMap, lanyardMap],
  );

  useEffect(
    () => () => {
      ropeGeometry.dispose();
      ropeMaterial.dispose();
    },
    [ropeGeometry, ropeMaterial],
  );

  useFrame((state, delta) => {
    const line = band.current;
    const fixedBody = fixed.current;
    const joint1 = j1.current;
    const joint2 = j2.current;
    const joint3 = j3.current;
    const cardBody = card.current;

    if (!line || !fixedBody || !joint1 || !joint2 || !joint3 || !cardBody) {
      return;
    }

    if (dragged) {
      vectors.pointerWorld
        .set(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera);
      vectors.direction
        .copy(vectors.pointerWorld)
        .sub(state.camera.position)
        .normalize();
      vectors.pointerWorld.add(
        vectors.direction.multiplyScalar(state.camera.position.length()),
      );

      [cardBody, joint1, joint2, joint3, fixedBody].forEach((body) => {
        body.wakeUp();
      });

      cardBody.setNextKinematicTranslation({
        x: vectors.pointerWorld.x - dragged.x,
        y: vectors.pointerWorld.y - dragged.y,
        z: vectors.pointerWorld.z - dragged.z,
      });
    }

    if (!hasInitializedLerp.current) {
      j1Lerped.current.copy(joint1.translation());
      j2Lerped.current.copy(joint2.translation());
      hasInitializedLerp.current = true;
    }

    const updateJointLerp = (
      body: RapierRigidBody,
      lerpedVector: THREE.Vector3,
    ) => {
      const bodyTranslation = body.translation();
      const clampedDistance = Math.max(
        0.1,
        Math.min(1, lerpedVector.distanceTo(bodyTranslation)),
      );

      lerpedVector.lerp(
        bodyTranslation,
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
      );
    };

    updateJointLerp(joint1, j1Lerped.current);
    updateJointLerp(joint2, j2Lerped.current);

    curve.points[0].copy(joint3.translation());
    curve.points[1].copy(j2Lerped.current);
    curve.points[2].copy(j1Lerped.current);
    curve.points[3].copy(fixedBody.translation());
    ropeGeometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

    vectors.angularVelocity.copy(cardBody.angvel());
    vectors.rotationVector.copy(cardBody.rotation());

    cardBody.setAngvel(
      {
        x: vectors.angularVelocity.x,
        y: vectors.angularVelocity.y - vectors.rotationVector.y * 0.25,
        z: vectors.angularVelocity.z,
      },
      true,
    );
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const target = event.target as PointerCaptureTarget;
    const cardBody = card.current;

    target.setPointerCapture(event.pointerId);
    setDragged(
      new THREE.Vector3()
        .copy(event.point)
        .sub(vectors.pointerOffset.copy(cardBody.translation())),
    );
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    const target = event.target as PointerCaptureTarget;

    target.releasePointerCapture(event.pointerId);
    setDragged(null);
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider
            args={[CARD_SIZE.width / 2, CARD_SIZE.height / 2, CARD_SIZE.depth / 2]}
          />
          <group
            onPointerDown={handlePointerDown}
            onPointerOut={() => setHovered(false)}
            onPointerOver={() => setHovered(true)}
            onPointerUp={handlePointerUp}
            position={CARD_GROUP_POSITION}
            scale={2.25}
          >
            <RoundedBox
              args={[CARD_SIZE.width, CARD_SIZE.height, CARD_SIZE.depth]}
              castShadow
              radius={0.14}
              receiveShadow
              smoothness={8}
            >
              <meshPhysicalMaterial
                clearcoat={isMobile ? 0.4 : 1}
                clearcoatRoughness={0.18}
                color="#140f22"
                metalness={0.22}
                roughness={0.72}
              />
            </RoundedBox>

            <mesh position={[0, 0, CARD_SIZE.depth / 2 + 0.003]}>
              <planeGeometry args={[CARD_FACE_SIZE.width, CARD_FACE_SIZE.height]} />
              <meshStandardMaterial map={frontMap} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>

            <mesh
              position={[0, 0, -(CARD_SIZE.depth / 2 + 0.003)]}
              rotation={[0, Math.PI, 0]}
            >
              <planeGeometry args={[CARD_FACE_SIZE.width, CARD_FACE_SIZE.height]} />
              <meshStandardMaterial map={backMap} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>

            <mesh position={[0, CARD_SIZE.height / 2 - 0.04, 0]}>
              <boxGeometry args={[0.18, 0.24, 0.12]} />
              <meshStandardMaterial color="#71717a" metalness={0.85} roughness={0.28} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <primitive attach="geometry" object={ropeGeometry} />
        <primitive attach="material" object={ropeMaterial} />
      </mesh>
    </>
  );
};

export default LanyardCard;
