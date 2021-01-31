import { Component, OnInit, Output, EventEmitter,ElementRef } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
declare var jQuery:any;



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  // public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };

  elementRef: ElementRef;
  @Output() public sidenavToggle = new EventEmitter();
 
  constructor(lementRef: ElementRef, private mScrollbarService: MalihuScrollbarService,) {
    this.elementRef = lementRef;
   }

   
 
  ngOnInit() {

    this.mScrollbarService.initScrollbar("#sidebar", { axis: 'y', theme: 'metro',scrollButtons: { enable: true } });
    (function ($) {
      $(document).ready(function () {
        // mcustomscrollbar('#sidebar',{
        //     theme: "minimal"
        // });

        $('#dismiss, .overlay').on('click', function () {
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
        });

        $('#sidebarCollapse').on('click', function () {
           // $('#sidebar').addClass('active');
           // $('.overlay').addClass('active');
           // $('.collapse.in').toggleClass('in');
         
            $('#sidebar').toggleClass('active');
          //  $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });

    $(document).ready(function () {
      $('ul.nav > li > a').click(function (e) {
          e.preventDefault();
          $('ul.nav > li > a').removeClass('active');
          $(this).addClass('active');
      });
  });
    })(jQuery);
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

     

  
 
}