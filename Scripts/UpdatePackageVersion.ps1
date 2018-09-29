param (
  [string]$buildVersion
)

function getPackageFiles() {
  $packageFiles = New-Object System.Collections.Generic.List[System.IO.FileInfo]
  $libPackages = Get-ChildItem -File ($PSScriptRoot + '/../package.json') -Recurse -Force

  foreach ($libPackage in $libPackages) {
    $packageFiles.Add($libPackage)
  }

  return $packageFiles
}

# ------------ Core Start
function loadModules() {
  Import-Module $($PSScriptRoot + "/Utils.psm1") -Force -Verbose
}
# ------------ Core End

loadModules
$parentPath = Split-Path -Path $PSScriptRoot -Parent
Write-Host 'Updating' $parentPath

Set-Location $parentPath
git add .
git commit -am 'auto'

npm version $buildVersion