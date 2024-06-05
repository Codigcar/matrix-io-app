import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IClipboardRepository } from 'src/core/modules/clipboard/repository/clipboard.repository';

import copyTextRequestToDto from '../mappers/copy-text/copy-text-serialize/copy-text.serialize';

class CopyTextUseCase implements IUseCase<string, void> {
  public repository: IClipboardRepository;

  constructor(repository: IClipboardRepository) {
    this.repository = repository;
  }

  public execute(data: string): void {
    const request = copyTextRequestToDto(data);
    return this.repository.copyText(request);
  }
}

export default CopyTextUseCase;
