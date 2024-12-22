const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
/*
 이미지 변환(.webp) 스크립트 : targetDirs  대상 경로 기입후 스크립트 실행
 */

//.webp 변환할 대상 경로 폴더들
const targetDirs = [
  path.join(
    __dirname,
    "../public/images/tactsuit/tactsuit-air/scroll-interaction",
  ),
  path.join(
    __dirname,
    "../public/images/tactsuit/tactsleeve/scroll-interaction",
  ),
];

// 디렉토리별 변환 상태를 저장할 JSON 파일
const completedStatusFile = path.join(
  __dirname,
  "optimized-images-status.json",
);

// 변환상태 저장파일 확인
let statusData = {};
if (fs.existsSync(completedStatusFile)) {
  statusData = JSON.parse(fs.readFileSync(completedStatusFile, "utf8"));
}

targetDirs.forEach((imageDir) => {
  // 현재 디렉토리 상대경로
  const relativeDirName = path.relative(__dirname, imageDir);

  // 디렉토리별 완료 상태 확인
  if (statusData[relativeDirName] && statusData[relativeDirName].completed) {
    return;
  }

  // 디렉토리가 없으면 생성
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  //이미지 변환
  const files = fs
    .readdirSync(imageDir)
    .filter((file) => /\.(jpe?g|png)$/i.test(file));

  const conversionPromises = files.map((file) => {
    const inputPath = path.join(imageDir, file);
    const outputFileName = file.replace(/\.[^/.]+$/, ".webp");
    const outputPath = path.join(imageDir, outputFileName);

    // 미리 변환된 파일이 없을 경우에만 변환
    if (!fs.existsSync(outputPath)) {
      return sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => {
          // 변환 성공 후 원본 파일 삭제
          fs.unlinkSync(inputPath);
        })
        .catch((err) => console.error(`Error processing ${file}:`, err));
    }
  });
  //디렉토리 변환 작업 확인
  Promise.all(conversionPromises)
    .then(() => {
      // 변환 완료돤 디렉터리 Json 상태 저장
      statusData[relativeDirName] = { completed: true };
      fs.writeFileSync(
        completedStatusFile,
        JSON.stringify(statusData, null, 2),
      );
    })
    .catch((err) =>
      console.error(`Error processing directory ${imageDir}:`, err),
    );
});
