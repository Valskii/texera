import { Injectable } from '@angular/core';
import { OperatorMetadataService } from '../../operator-metadata/operator-metadata.service';

@Injectable()
export class WorkflowGraphUtilsService {

  private nextAvailableID = 0;


  constructor(private operatorMetadataService: OperatorMetadataService) {
  }

  // generate a new operator ID
  getNextAvailableID(): string {
    this.nextAvailableID++;
    return 'operator-' + this.nextAvailableID.toString();
  }

  // return a new OperatorPredicate with a new ID and default intial properties
  getNewOperatorPredicate(operatorType: string): OperatorPredicate {
    const operatorID = this.getNextAvailableID();
    const operatorProperties = {};

    const operatorSchema = this.operatorMetadataService.getOperatorMetadata(operatorType);

    const inputPorts: string[] = [];
    const outputPorts: string[] = [];

    for (let i = 0; i < operatorSchema.additionalMetadata.numInputPorts; i++) {
      inputPorts.push('input-' + i.toString());
    }

    for (let i = 0; i < operatorSchema.additionalMetadata.numOutputPorts; i++) {
      outputPorts.push('output-' + i.toString());
    }

    return { operatorID, operatorType, operatorProperties, inputPorts, outputPorts};

  }

}