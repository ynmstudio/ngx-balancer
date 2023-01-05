import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { NgxResize, NgxResizeResult, provideNgxResizeOptions } from 'ngx-resize';

@Component({
  selector: 'ngx-balancer, [ngx-balancer]',
  standalone: true,
  template: `
  <span #wrapper>
    <ng-content></ng-content>
  </span>
  `,
  styleUrls: ['./ngx-balancer.component.scss'],
  hostDirectives: [
    {
      directive: NgxResize,
      outputs: ['ngxResize']
    }
  ],
  providers: [
    provideNgxResizeOptions({
      emitInZone: false,
    })
  ]
})
export class NgxBalancerComponent implements AfterViewInit {
  @Input() ratio = 1;
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef<HTMLElement>;
  @HostListener('ngxResize', ['$event']) onResize(event: NgxResizeResult) {
    this.relayout();
  }
  wrapperWidth = '';

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.relayout();
  }

  relayout = () => {
    const wrapper = this.wrapper.nativeElement;
    const container = this.elRef.nativeElement;

    if (!wrapper || !container) return;

    const update = (width: number) => {
      if (!wrapper) return;
      this.renderer.setStyle(wrapper, 'max-width', width + 'px');
    };

    // Reset wrapper width
    wrapper.style.maxWidth = '';

    // Get the intial container size
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Synchronously do binary search and calculate the layout
    let left: number = width / 2;
    let right: number = width;
    let middle: number;
    if (width) {
      while (left + 1 < right) {
        middle = ~~((left + right) / 2);
        update(middle);
        if (container.clientHeight === height) {
          right = middle;
        } else {
          left = middle;
        }
      }

      // Update the wrapper width
      update(right * this.ratio + width * (1 - this.ratio));
    }
  }
}
