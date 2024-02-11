import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'vrt-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output()
  onSearch = new EventEmitter<string>();
 
  @Input()
  options: string[] = [];
  filteredOptions: string[] = [];
  inputValue?: string;

  onChange(value: string) {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onSubmit() {
    this.onSearch.emit(this.inputValue);
  }
}
