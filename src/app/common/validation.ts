export class Validation{
    keyPressAlpha(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z s]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
      keyPressAlphanumeric(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z 0-9 s]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
      number(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[0-9]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }

      decnumber(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/^\d*\.?\d*$/.test(inp) || event.keyCode == 8 || event.keyCode == 46) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }



      keyPressexceptional(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z  /s  _ . : - () & , ]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
      allowNumbersDot(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[ 0-9 .]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
}