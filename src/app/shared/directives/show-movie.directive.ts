import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowMovie]',
  standalone: true,
})
export class ShowMovieDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appShowMovie(sameMovie: boolean) {
    console.log('dentro da directive appShowMovie', sameMovie);

    if (sameMovie && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (sameMovie && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
