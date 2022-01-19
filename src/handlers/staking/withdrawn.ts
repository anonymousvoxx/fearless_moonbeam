import * as events from "../../types/events"

import { StakingData, StakingEventType } from "../../model"

import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID } from "../../helpers/common"
import { handleStakingEvent } from "./baseHandler"

function getWithdrawnEvent(ctx: EventHandlerContext): StakingData {
    let event = new events.StakingWithdrawnEvent(ctx)

    let [ account, amount ] = event.asLatest
    return new StakingData({
        account: encodeID(account),
        amount: amount,
    })
}


export async function handleWithdrawnEvent(ctx: EventHandlerContext) {
    await handleStakingEvent(ctx, StakingEventType.Withdrawn, getWithdrawnEvent)
}