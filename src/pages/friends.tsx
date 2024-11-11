import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import { useClaimBauntyForFriend } from "@/hooks/api/useClaimBauntyForFriend";
import { useClaimBauntyForAllFriends } from "@/hooks/api/useClaimBauntyForAllFriends";
import { IReferral, Page } from "@/types";
import { 
  FC, 
  useCallback, 
  useEffect,
  useState, 
  useRef, 
} from "react";
import useUpdateReferrals from "@/hooks/api/useUpdateReferrals";

const Friends: FC = () => {

  const { setPage, setIsFooterTransparent } = useSiteStore()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
      setPage(Page.FRIENDS)
  }, [setPage])

  useEffect(() => {
    setIsFooterTransparent(true);
  }, [setIsFooterTransparent]);
  
  const { 
    referralsPage, 
    referralsTotal,
    referralsCode,
    getRefferals,
    claimedAll
  } = useUserStore()
 
 const [referrals, setReferrals] = useState<IReferral[]>()
 const [claimBlocked, setClaimBlocked] = useState<boolean>(false)

 const { updateReferrals } = useUpdateReferrals(apiFetch, referralsPage, 10)

  const onClaimAllSuccess = () => {
    setClaimBlocked(true)
    updateReferrals()
  }

 const { claimBauntyForAll } = useClaimBauntyForAllFriends(apiFetch, onClaimAllSuccess)

  useEffect(() => {
    
    if (referralsTotal) {
      setReferrals(getRefferals(referralsPage)) //
      setIsFooterTransparent(false)
    }

    if (referralsCode) {
      //console.log('code:', referralsCode)
      const message = 'Dragon farm. Открывай сундуки дракона и получай награды!'
      const url = `https://t.me/Minesweeper_demo_bot/MinesweeperDemo?startapp=referrerId=${referralsCode}`
      setReferralUrl(url)
      const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
      setTelegramUrl(tUrl)
    }

    
  }, [referralsPage, 
    referralsTotal,
    referralsCode,
    getRefferals
  ])

  const [referralUrl, setReferralUrl] = useState("link/ref=userandranders03Hf72nf5Nfa941412") 
  const [telegramUrl, setTelegramUrl] = useState("")

  const handleShare = () => {
     window.open(telegramUrl, '_blank');
  };

  const handleCopy = () => {
    // Using the Clipboard API to copy text
    if (navigator.clipboard) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(referralUrl)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying text: ", err);
          fallbackCopyText(referralUrl);
        });
    } else {
      // Fallback method
      fallbackCopyText(referralUrl);
    }
  }

  const fallbackCopyText = useCallback((text: string) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.value = text;
      textArea.select();
      try {
        document.execCommand('copy');
        //alert("Text copied using fallback!");
      } catch (err) {
        //console.error('Fallback: Oops, unable to copy', err);
      }
    } else {
      //console.error('Fallback: Text area reference is null');
    }
  }, [])

  const handleClaimedAll = () => {
    claimBauntyForAll(1, 10)
  }

  return (
    <div  className="overflow-x-hidden pb-48 tasks-list z-0 pt-1.5">
        {/* Friends header */}
        <div className='shop-dialog-title mt-8 uppercase px-2'>INVITE FRIENDS!</div>
        <div className='mt-3 shop-dialog-description px-2'>
        You and your friend will get bonus
        </div>
        {/* Friends banner */}
        <div className="pt-4 mx-1 px-3">
          <div className="friends-banner flex flex-row items-center justify-between py-2">
            <div className="flex flex-col items-center w-full gap-1.5">
              <div className="
              w-full text-center friends-banner-title px-4">Telegram</div>
              <div className="friend-banner-baunty flex flex-row 
              items-center justify-center gap-1">
                <img className="w-6 h-6" src="/stats/coin.webp" alt="" />
                +1 250
              </div>
              <div className="friend-banner-description w-full">both for you and your friend</div>
            </div>
            <div className="flex flex-col items-center w-full gap-1.5">
              <div className="w-full text-center friends-banner-title px-4">Telegram Premium</div>
              <div className="friend-banner-baunty flex flex-row 
              items-center justify-center gap-1">
                <img className="w-6 h-6" src="/stats/coin.webp" alt="" />
                +3 200
              </div>
              <div className="friend-banner-description w-full">both for you and your friend</div>
            </div>
          </div>
        </div>
        {/* Friends list */}
        <div className="w-full px-4 pt-6 friends-list-label flex flex-row items-center justify-between">
          <div>Your friends</div>
          <div>{referrals?.length && !claimedAll && <div className="
          invite-friends-btn
          btn-no-body 
          w-24 flex flex-row gap-1 items-center justify-center
          px-3 py-2
          claim-all-btn
          "
            onClick={handleClaimedAll}
            >Claim all
              <img className="w-4 h-4" src="/friends/claim-check.svg" alt="claim" />
            </div>}
          </div>
        </div>
        {referrals 
          ? <><FriendsList friends={referrals} claimBlocked={claimBlocked} /></> 
          : <div className="mx-1 mt-4 flex items-center justify-center gap-2 h-16 no-friends-slot">
            Still no friends here 😔
            </div>
        }
         <div className='friends-btns fixed bottom-28 mb-1 w-screen px-3 flex flex-row justify-between gap-3'>
        <div className='
        invite-friends-btn 
        w-full btn-no-body 
        flex flex-row items-center justify-center 
        gap-2 text-nowrap
        px-5 py-4
        '
          onClick={handleShare}
          >INVITE FRIENDS 
        </div>
        <div className='
        invite-friends-btn btn-no-body 
        w-20 flex items-center justify-center
        px-5 py-4
        '
           onClick={handleCopy}
           >
          <img className="w-8 h-8" src="/friends/copy.svg" alt="copy" />
        </div>
      </div>   
    </div>
  )
}

export default Friends

interface UserItemProps {
  player: IReferral
  index: number
  onClaimClick: (referralId: string) => void
  claimBlocked: boolean
}

interface FriendsListProps {
  friends: IReferral[]
  claimBlocked: boolean
}   

const FriendsList: FC<FriendsListProps> = (props) => {
  const { friends } = props

  const { claimBaunty } = useClaimBauntyForFriend(apiFetch) // 
  const handleClaim = (referralId: string) => {
    console.log(referralId)
    claimBaunty(referralId)
  }

  return <div className="mx-1 mt-4 px-3 z-0">
    <div className="friends-list flex flex-col">
    <div className="overflow-x-auto">
      <table className="table">
      <thead>
      <tr>
        <th className="w-[5%]">№</th>
        <th className="w-[50%]">Player</th>
        <th className="w-[20%] text-center">Bonus</th>
        <th className="w-[25%]"></th>
      </tr>
      </thead>
      <tbody>
        {friends.map((friend, i) => <UserItem 
        key={i} 
        player={friend} 
        index={i} 
        onClaimClick={handleClaim}
        claimBlocked={props.claimBlocked}  
        />)}
      </tbody>
      </table>
    </div>
    </div>
  </div>
}

const UserItem: FC<UserItemProps> = (props) => {
  const { player, index, onClaimClick } = props

  const [fullName, setFullName] = useState<string>("")
  useEffect(() => {
    const firstName = player.firstName || ""
    const lastName = player.lastName || ""
    setFullName(firstName + " " + lastName)
  }, [player.firstName, player.lastName])

  return  (
  <tr className="friends-slot">
    <th>{index + 1}</th>
    <th>
     <div>{fullName}</div>
    </th>
    <th className="flex flex-row gap-1 items-center justify-end">
      <img className="w-5 h-5" src="/stats/coin.webp" alt="" />
      <div className="friend-slot-baunty">7.4K</div>
    </th>
    <th>
      {player.referrerRewarded || props.claimBlocked ? null
      : <div
          className="claim-btn btn-no-body"
          onClick={() => onClaimClick(player.id || "")}>
          Claim
          <img className="w-3 h-3" src="/friends/claim-check.svg" alt="claim"/>
        </div>
      }
    </th>
  </tr>)
}

