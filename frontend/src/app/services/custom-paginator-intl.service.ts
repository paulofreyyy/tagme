import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
    override changes = new Subject<void>();

    override itemsPerPageLabel = 'Itens por página:';
    override nextPageLabel = 'Próxima página';
    override previousPageLabel = 'Página anterior';
    override firstPageLabel = 'Primeira página';
    override lastPageLabel = 'Última página';

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }
        const startIndex = page * pageSize;
        const endIndex = Math.min(startIndex + pageSize, length);
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
}
