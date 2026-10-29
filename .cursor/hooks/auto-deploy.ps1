# On agent stop: if the site has uncommitted or unpushed changes, deploy to GitHub Pages.
try {
  $null = [Console]::In.ReadToEnd()
} catch {}

$ErrorActionPreference = 'Continue'

# Project root: .cursor/hooks -> ../..
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
Set-Location $root

$ghDir = 'C:\Users\Administrator\AppData\Local\gh-cli\bin'
if (Test-Path (Join-Path $ghDir 'gh.exe')) {
  $env:PATH = "$ghDir;$env:PATH"
}

if (-not (Test-Path '.git')) {
  Write-Output '{}'
  exit 0
}

$status = @(git status --porcelain 2>$null)
$unpushed = 0
git rev-parse --abbrev-ref '@{u}' 2>$null | Out-Null
if ($LASTEXITCODE -eq 0) {
  $count = git rev-list --count '@{u}..HEAD' 2>$null
  if ($count) { $unpushed = [int]$count }
}

if ($status.Count -gt 0) {
  git add -A 2>$null | Out-Null
  git -c user.name='AAAA-web-deploy' -c user.email='AAAA-web-deploy@users.noreply.github.com' commit -m "Update Grokius ETH site $(Get-Date -Format 'yyyy-MM-dd HH:mm')" 2>$null | Out-Null
  git push -u origin HEAD 2>$null | Out-Null
  Write-Output '{"followup_message":"Site changes were auto-committed and pushed to GitHub Pages."}'
  exit 0
}

if ($unpushed -gt 0) {
  git push origin HEAD 2>$null | Out-Null
  Write-Output '{"followup_message":"Unpushed commits were pushed; GitHub Pages will redeploy."}'
  exit 0
}

Write-Output '{}'
exit 0
