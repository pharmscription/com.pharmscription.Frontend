System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },

  packages: {
    "ts": {
      "main": "src/bootstrap",
      "defaultExtension": "ts"
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.3",
    "angular-material": "github:angular/bower-material@1.0.6",
    "angular-messages": "github:angular/bower-angular-messages@1.5.3",
    "angular-route": "github:angular/bower-angular-route@1.5.3",
    "jquery": "npm:jquery@2.2.2",
    "typescript": "npm:typescript@1.8.9",
    "github:angular/bower-angular-animate@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-aria@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-messages@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-route@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-material@1.0.6": {
      "angular": "github:angular/bower-angular@1.5.3",
      "angular-animate": "github:angular/bower-angular-animate@1.5.3",
      "angular-aria": "github:angular/bower-angular-aria@1.5.3",
      "css": "github:systemjs/plugin-css@0.1.20"
    }
  }
});
