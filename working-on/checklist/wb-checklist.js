/**
 * @title WET-BOEW Checklist plugin
 * @overview Plugin contained to show an example of a custom WET checklist plugin
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @ux-tbs
 */
( function( $, window, wb ) {
  "use strict";
  /*
   * Variable and function definitions.
   * These are global to the plugin - meaning that they will be initialized once per page,
   * not once per instance of plugin on the page. So, this is a good place to define
   * variables that are common to all instances of the plugin on a page.
   */
  var componentName = "wb-checklist",
      selector = "." + componentName,
      initEvent = "wb-init" + selector,
      $document = wb.doc,
      /**
       * @method init
       * @param {jQuery Event} event Event that triggered the function call
       */
      init = function( event ) {
        // Start initialization
        // returns DOM object = proceed with init
        // returns undefined = do not proceed with init (e.g., already initialized)
        var elm = wb.init( event, componentName, selector ),
            $elm;

        if ( elm ) {
          $elm = $( elm );
          var $elms = $elm.find($("[role='checkbox']"));
          for (let i = 0; i < $elms.length; i++) {
            this.domNode = $elms.get(i);
            this.keyCode = Object.freeze({
              "RETURN": 13,
              "SPACE": 32
            })
            this.domNode.tabIndex = 0;
            if (!$(this.domNode).attr("aria-checked")) {
              $(this.domNode).attr("aria-checked", "false");
            }
          }

        $elm.trigger( "click" );
        $elm.trigger( "keydown" );

        wb.ready( $elm, componentName );
      }
    };
  // Add your plugin event handler
  $document.on( "click", selector, function( event ) {
    var elm = event.target,
        $elm = $( elm );
    if( $elm.attr("aria-checked") === "true" ) {
      $elm.attr("aria-checked", "false");
    } else {
      $elm.attr("aria-checked", "true");
    }
  } );

  $document.on( "keydown", selector, function( event ) {
    var elm = event.target,
        $elm = $( elm ),
        flag = false;
    switch (event.keyCode) {
      case this.keyCode.SPACE:
        if( $elm.attr("aria-checked") === "true" ) {
          $elm.attr("aria-checked", "false");
        } else {
          $elm.attr("aria-checked", "true");
        }
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  });
  // Bind the init event of the plugin
  $document.on( "timerpoke.wb " + initEvent, selector, init );
  // Add the timer poke to initialize the plugin
  wb.add( selector );
  } )( jQuery, window, wb );