import instaImg from '@assets/instagram.png';
import './SearchPage.scss';
import { IdolGroup } from './type';

interface GroupCardProps {
  group: IdolGroup;
  onSubscribe: (id: number, isSubscribed: boolean) => void;
}

const GroupCard = ({ group, onSubscribe }: GroupCardProps) => {
  return (
    <div className="group_card">
      <img src={group.image} alt={group.name} className="group_img" />
      <div className="group_info">
        <h1 className="group_name">{group.name}</h1>
        <p className="group_mem">
          {Array.isArray(group.idol_names)
            ? group.idol_names.join(', ')
            : group.idol_names}
        </p>
        <p className="group_agency">{group.agency}</p>

        <a
          href={group.sns}
          className="group_sns"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instaImg} alt="인스타그램" className="insta_icon" />
        </a>

        <button
          className={`sub_button ${group.isSubscribed ? 'subscribed' : ''}`}
          onClick={() => onSubscribe(group.id, group.isSubscribed)}
        >
          {group.isSubscribed ? '구독 중' : '구독하기'}
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
