cd /d %~dp0
if not exist "%~dp0\temp" mkdir %~dp0\temp
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi', 'temp\nodeJsinstaller.msi')"
start /wait "%SystemRoot%\system32\msiexec.exe" /i %~dp0\temp\nodeJsinstaller.msi /QF /L*V "C:\Temp\msilog.log"
@RD /S /Q "%~dp0\temp"
