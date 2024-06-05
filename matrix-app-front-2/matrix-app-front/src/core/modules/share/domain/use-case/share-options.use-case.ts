import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IShareRepository } from 'src/core/modules/share/repository/share.repository';
import IShareOptionsRequest from 'src/core/modules/share/dtos/share-options/share-options-request.interface';

import shareOptionsRequestToDto from '../mappers/share-options/share-options-serialize/share-options.serialize';

class ShareOptionsUseCase implements IUseCase<IShareOptionsRequest, void> {
  public repository: IShareRepository;

  constructor(repository: IShareRepository) {
    this.repository = repository;
  }

  public async execute(data: IShareOptionsRequest): Promise<void> {
    const request = shareOptionsRequestToDto(data);
    return this.repository.shareOptions(request);
  }
}

export default ShareOptionsUseCase;
