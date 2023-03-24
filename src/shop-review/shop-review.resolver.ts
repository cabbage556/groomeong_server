import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/apis/auth/guards/gql-auth.guard';
import { ReservationsService } from 'src/apis/reservations/reservation.service';
import { ReturnShopOutput } from 'src/apis/shops/dto/return-shop.output';
import { IContext } from 'src/commons/interface/context';
import { AddShopReviewService } from './shop-review.service';

@Resolver()
export class AddShopReviewResolver {
	constructor(
		private readonly addShopReviewService: AddShopReviewService, //
	) {}

	@UseGuards(GqlAuthGuard('access'))
	@Query(() => ReturnShopOutput, {
		description:
			'Return : 가게 데이터 및 리뷰 작성 권한 여부. (리뷰 작성 가능하면 true, 불가하면 error)',
	})
	fetchShopWithReviewAuth(
		@Args('shopId') shopId: string, //
		@Context() context: IContext,
	): Promise<ReturnShopOutput> {
		const userId = context.req.user.id;
		return this.addShopReviewService.AddShopWithReviewAuth({
			shopId,
			userId,
		});
	}
}
