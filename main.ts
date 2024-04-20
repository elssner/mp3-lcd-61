input.onGesture(Gesture.TiltRight, function () {
    serialmp3.runMp3Command(Mp3Command.PLAY_NEXT_TRACK)
})
input.onGesture(Gesture.ScreenDown, function () {
    serialmp3.runMp3Command(Mp3Command.PAUSE)
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Titel += -1
    fTitelName(Ordner, Titel)
})
function fTitelName (pOrdner: number, pTitel: number) {
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text("Ordner" + pOrdner + " Titel" + pTitel))
    if (pOrdner == 1 && lcd16x2rgb.between(pTitel, 0, 15)) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, Ordner1()[pTitel])
    } else if (pOrdner == 3 && lcd16x2rgb.between(pTitel, 0, 12)) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, Ordner3Tabaluga()[pTitel])
    } else {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, lcd16x2rgb.lcd16x2_text("keine Daten"))
    }
}
input.onGesture(Gesture.TiltLeft, function () {
    serialmp3.runMp3Command(Mp3Command.PLAY_PREVIOUS_TRACK)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (Titel < 1) {
        Titel = 1
        serialmp3.playMp3Folder(Ordner, Mp3Repeat.No)
    } else {
        serialmp3.playMp3TrackFromFolder(Titel, Ordner, Mp3Repeat.No)
    }
})
serialmp3.onMp3TrackCompleted(function () {
    lcd16x2rgb.comment("spielt den nächsten Titel, der im Display angezeigt wird")
    if (serialmp3.mp3Folder() != Ordner || serialmp3.mp3Track() != Titel) {
        serialmp3.playMp3TrackFromFolder(Titel, Ordner, Mp3Repeat.No)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Titel += 1
    fTitelName(Ordner, Titel)
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Hold), function () {
    Ordner += -1
    fTitelName(Ordner, Titel)
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Hold), function () {
    Ordner += 1
    fTitelName(Ordner, Titel)
})
serialmp3.onMp3TrackStarted(function () {
    fTitelName(serialmp3.mp3Folder(), serialmp3.mp3Track())
})
input.onGesture(Gesture.ScreenUp, function () {
    serialmp3.runMp3Command(Mp3Command.RESUME)
})
function Ordner1 () {
    return [
    "Ordner 1 spielen",
    "Das Lied der Schlümpfe",
    "2 Macarena",
    "Pack die Badehose ein",
    "4 Das Buch",
    "5 Nessaja",
    "Fang das Licht",
    "Sommer in Germany",
    "Sandmann lieber Sandmann",
    "Blaue Wimpel",
    "Sind die Lichter",
    "Dann geh doch zu Netto",
    "12 Oh Susi",
    "Vereinstanz",
    "Calliope Song",
    "Calliope Karaoke"
    ]
}
function Ordner3Tabaluga () {
    return [
    "Tabaluga spielen",
    "1 Einleitung",
    "2 Tyrion",
    "3 Tabaluga",
    "Lied des Mondes",
    "Arbeit ist das halbe Leben",
    "Riesen-Glück",
    "Der Baum des Lebens",
    "Drache und Salamander",
    "Kaulquappenschule",
    "Himmelsriesen",
    "Die Delphine",
    "12 Nessaja"
    ]
}
let Titel = 0
let Ordner = 0
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
serialmp3.connectSerialMp3(DigitalPin.C16, DigitalPin.C17)
Ordner = serialmp3.mp3Folder()
Titel = serialmp3.mp3Track()
fTitelName(Ordner, Titel)
lcd16x2rgb.comment("mp3-lcd-62")
lcd16x2rgb.comment("2 Erweiterungen:")
lcd16x2rgb.comment("mkleinsb/pxt-serialmp3")
lcd16x2rgb.comment("calliope-net/lcd-16x2")
