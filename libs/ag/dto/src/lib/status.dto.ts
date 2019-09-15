import { IsNotEmpty } from 'class-validator';

/**
 * Status object
 */
export class StatusDTO {
  @IsNotEmpty()
  operation: string;

  @IsNotEmpty()
  success: boolean;

  message: string;
}
