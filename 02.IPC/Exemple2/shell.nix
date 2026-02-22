{ pkgs ? import <nixpkgs> {} }:

(pkgs.buildFHSEnv {
  name = "electron-env";
  targetPkgs = pkgs: (with pkgs; [
    nodejs
    
    # --- Electron GUI Dependencies ---
    nspr      # <-- Fixes libnspr4.so
    nss       # Usually the very next thing it asks for
    alsa-lib
    atk
    at-spi2-atk
    cairo
    cups
    dbus
    expat
    glib
    gtk3
    libdrm
    libgbm
    libxkbcommon
    mesa
    pango
    systemd

    # --- X11 Dependencies ---
    xorg.libX11
    xorg.libXcomposite
    xorg.libXdamage
    xorg.libXext
    xorg.libXfixes
    xorg.libXrandr
    xorg.libxcb
    xorg.libxshmfence
  ]);
  runScript = "bash";
}).env
