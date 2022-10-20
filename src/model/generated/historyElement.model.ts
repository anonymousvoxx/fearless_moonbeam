import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Staker} from "./staker.model"
import {Round} from "./round.model"

@Entity_()
export class HistoryElement {
  constructor(props?: Partial<HistoryElement>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Index_()
  @ManyToOne_(() => Staker, {nullable: true})
  staker!: Staker | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Column_("int4", {nullable: false})
  type!: number

  @Index_()
  @ManyToOne_(() => Round, {nullable: false})
  round!: Round

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint
}
