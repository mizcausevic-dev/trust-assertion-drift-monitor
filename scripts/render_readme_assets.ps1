$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(103, 224, 190), 2)
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))

  $fontTitle = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("Trust Assertion Drift Monitor", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Public trust claims stay grounded in live evidence" -Subtitle "This monitor turns assertion confidence, evidence freshness, contradiction load, and owner continuity into one board-readable trust layer." -Bullets @(
  "Which public assertions are strong enough to reuse and which ones are drifting away from live proof.",
  "Where freshness drift, contradiction load, or weak ownership will stall the next trust review first.",
  "What should close, refresh, restate, or escalate before the next external ask."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-assertion-register-proof.png") -Title "Assertion register keeps claims and owners attached" -Subtitle "Every route retains the assertion family, owner, audience, confidence score, and next move." -Bullets @(
  "Each public claim stays connected to who owns it and who relies on it.",
  "Weak trust language is visible before it lands in a buyer or investor review.",
  "The next corrective move sits next to the assertion instead of in another memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-drift-matrix-proof.png") -Title "Drift matrix shows where trust language has outrun the proof" -Subtitle "Missing evidence, freshness drift, and contradiction load remain visible in one trust layer." -Bullets @(
  "Missing proof is explicit instead of implied.",
  "Freshness and contradiction pressure are readable at a glance.",
  "Each trust assertion ties to a concrete remediation move."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-remediation-posture-proof.png") -Title "Remediation posture keeps cleanup grounded in owners and contradictions" -Subtitle "Composite trust risk, contradiction count, and next moves stay grounded in the same operating view." -Bullets @(
  "Cleanup work stays tied to one owner and one contradiction count.",
  "Escalate or restate decisions are readable before the next review cycle.",
  "Buyers, boards, and investors can see what should close first."
)
