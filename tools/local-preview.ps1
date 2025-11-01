[CmdletBinding()]
param(
    [int]$Port = 8000,
    [string]$BindAddress = "127.0.0.1"
)

$repoRoot = Resolve-Path -Path (Join-Path $PSScriptRoot "..")

Write-Host ("Starting static preview at http://{0}:{1}/ (root: {2})" -f $BindAddress, $Port, $repoRoot)
Write-Host "Press Ctrl+C to stop the server."

Push-Location $repoRoot
try {
    $pythonArgs = @("-m", "http.server", $Port.ToString(), "--bind", $BindAddress)
    python @pythonArgs
}
finally {
    Pop-Location
}
